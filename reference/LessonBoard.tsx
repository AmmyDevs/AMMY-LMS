"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/ui/components/atomic/Card";
import { Button } from "@/ui/components/atomic/Button";
import { Tag } from "@/ui/components/atomic/Tag";
import {
  GripVertical,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Eye,
  Play,
  BookOpen,
  Lock,
  Download,
  Wand2,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Lesson, Topic, Module } from "@/types/lesson";
import { ContentAPI } from "@/lib/api/content-generation";

import { useParams, useRouter } from "next/navigation";

/**
 * LessonBoard Component - Molecule level component for displaying course lessons with topics
 */

export interface LessonBoardProps {
  lessons?: Lesson[];
  modules?: Module[];
  allTopics?: Topic[];
  allLessons?: Topic[];
  variant?: 'lecturer' | 'student';
  initialExpandedLessons?: string[];
  initialExpandedModules?: string[];
  onEditLesson?: (lessonId: string) => void;
  onEditModule?: (moduleId: string) => void;
  onDeleteLesson?: (lessonId: string) => void;
  onDeleteModule?: (moduleId: string) => void;
  onEditTopic?: (topicId: string) => void;
  onPreviewTopic?: (topicId: string) => void;
  onPreviewLesson?: (lessonId: string) => void;
  onPublishTopic?: (topicId: string) => void;
  onPublishLesson?: (lessonId: string) => void;
  onStartTopic?: (topicId: string) => void;
  onStartLesson?: (lessonId: string) => void;
  className?: string;
  showDragHandles?: boolean;
}

const getFormatBadgeColor = (format?: string) => {
  switch (format) {
    case 'pdf': return 'bg-red-500/10 text-red-500 border-red-500/20';
    case 'pptx': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    case 'docx': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'mp4': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
    case 'scorm': return 'bg-primary/10 text-primary border-primary/20';
    default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
  }
};

const formatDuration = (topic: Topic): string => {
  if (topic.type === "scorm" && topic.scorm_blocks_count) {
    return `${topic.scorm_blocks_count} ${topic.scorm_blocks_count === 1 ? 'block' : 'blocks'}`;
  }
  
  if (!topic.duration) return "";

  if (topic.type === "document" || topic.file_format === 'pdf' || topic.file_format === 'docx') {
    return `${topic.duration} ${topic.duration === 1 ? 'page' : 'pages'}`;
  }
  if (topic.type === "ppt" || topic.file_format === 'pptx') {
    return `${topic.duration} ${topic.duration === 1 ? 'slide' : 'slides'}`;
  }

  return `${topic.duration} min`;
};

export function LessonBoard({
  lessons: lessonsProp,
  modules,
  allTopics: topicsProp,
  allLessons,
  variant = 'lecturer',
  initialExpandedLessons,
  initialExpandedModules,
  onEditLesson,
  onEditModule,
  onDeleteLesson,
  onDeleteModule,
  onEditTopic,
  onPreviewTopic,
  onPreviewLesson,
  onPublishTopic,
  onPublishLesson,
  onStartTopic,
  onStartLesson,
  className,
  showDragHandles = true,
}: LessonBoardProps) {
  const lessons = lessonsProp || modules || [];
  const allTopics = topicsProp || allLessons || [];
  const initialExpanded = initialExpandedLessons || initialExpandedModules;
  const router = useRouter();
  const params = useParams();
  
  // Bridge platform 'moduleId' (which is Course ID) to SCORM terminology
  const scormModuleId = (params.moduleId as string) || (lessons[0]?.module_id as string) || "";

  const handleEditLesson = onEditLesson || onEditModule;
  const handleDeleteLesson = onDeleteLesson || onDeleteModule;
  const handlePreviewTopic = onPreviewTopic || onPreviewLesson;
  const handlePublishTopic = onPublishTopic || onPublishLesson;
  const handleStartTopic = onStartTopic || onStartLesson;

  const handleStartScorm = (lessonId: string, topicId?: string) => {
    const hash = topicId ? `#${topicId}` : "";
    router.push(`/student/modules/${scormModuleId}/lessons/${lessonId}${hash}`);
  };

  const [expandedLessons, setExpandedLessons] = useState<string[]>(
    initialExpanded || lessons.map((l) => l.id)
  );

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      {lessons.map((lesson, lessonIndex) => {
        const lessonTopics = allTopics.filter(
          (t) => t.lesson_id === lesson.id || t.module_id === lesson.id
        );
        const isExpanded = expandedLessons.includes(lesson.id);
        const isScormLesson = Boolean(lesson.scorm_project_id);

        return (
          <Card
            key={lesson.id}
            className={cn(
              "border shadow-sm transition-all duration-200 overflow-hidden",
              "border-border/40 hover:border-primary/40 hover:shadow-md",
              "dark:border-border/30 dark:hover:border-primary/40 dark:hover:shadow-lg",
              "dark:bg-bg-panel/50",
              isScormLesson && "border-primary/20"
            )}
          >
            <CardContent className="p-0">
              <div className={cn(
                "p-4 sm:p-5 border-b border-border/30",
                "bg-surface/80",
                "dark:bg-bg-card/30 dark:border-border/20"
              )}>
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                    {showDragHandles && (
                      <GripVertical className="hidden sm:block w-6 h-6 text-ink-muted flex-shrink-0 mt-0.5 cursor-move hover:text-primary transition-colors" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-ink text-base sm:text-lg mb-1">
                        Lesson {lessonIndex + 1}: {lesson.title}
                      </h3>
                      <p className="text-sm text-ink-muted flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="font-semibold">
                          {lessonTopics.length}{" "}
                          {lessonTopics.length === 1 ? "topic" : "topics"}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">
                          Lesson {lesson.order}/{lessons.length}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {handleEditLesson && !isScormLesson && (
                      <Button
                        variant="tertiary"
                        color="ghost"
                        icon={<Edit />}
                        size="sm"
                        onClick={() => handleEditLesson(lesson.id)}
                        aria-label="Edit lesson"
                      />
                    )}
                    {handleDeleteLesson && (
                      <Button
                        variant="tertiary"
                        color="destructive"
                        icon={<Trash2 />}
                        size="sm"
                        onClick={() => handleDeleteLesson(lesson.id)}
                        aria-label="Delete lesson"
                      />
                    )}
                    <Button
                      variant="tertiary"
                      color="ghost"
                      icon={isExpanded ? <ChevronDown /> : <ChevronRight />}
                      size="sm"
                      onClick={() => toggleLesson(lesson.id)}
                      aria-label={isExpanded ? "Collapse lesson" : "Expand lesson"}
                    />
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="bg-bg/50 dark:bg-transparent">
                  {/* SCORM Lesson Actions (Lecturer only) */}
                  {isScormLesson && variant !== 'student' && (
                    <div className="px-4 sm:pl-12 sm:pr-5 py-4 border-b border-border/10 bg-primary/5 dark:bg-primary/10">
                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={ContentAPI.getScormDownloadUrl(lesson.scorm_project_id! || "")}
                          download
                          className="no-underline"
                        >
                          <Button variant="secondary" color="default" icon={<Download />} size="sm">
                            Download SCORM ZIP
                          </Button>
                        </a>
                        <Button
                          variant="secondary"
                          color="outline"
                          icon={<Wand2 />}
                          size="sm"
                          onClick={() => {
                            if (typeof window !== "undefined") {
                              window.location.href = `/lecturer/msomi-assistance/content-creator/${lesson.scorm_project_id}`
                            }
                          }}
                        >
                          Edit with AI
                        </Button>
                      </div>
                    </div>
                  )}

                  {lessonTopics.length > 0 ? (
                    lessonTopics.map((topic) => {
                      const durationText = formatDuration(topic);

                      return (
                        <div
                          key={topic.id}
                          className={cn(
                            "px-4 sm:pl-12 sm:pr-5 py-3.5 border-b last:border-b-0 transition-colors duration-150",
                            "border-border/20 hover:bg-primary/5",
                            "dark:border-border/10 dark:hover:bg-primary/8"
                          )}
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            {showDragHandles && (
                              <GripVertical className="hidden sm:block w-4 h-4 text-ink-muted/40 cursor-move hover:text-primary transition-colors flex-shrink-0" />
                            )}

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <span className="font-medium text-ink text-sm line-clamp-1">
                                    {topic.title}
                                  </span>
                                  <div className="flex items-center gap-2 mt-1">
                                    {(topic.file_format || topic.type === 'scorm') && (
                                      <span className={cn(
                                        "text-[10px] px-1.5 py-0.5 rounded border uppercase font-bold tracking-wider flex-shrink-0",
                                        getFormatBadgeColor(topic.file_format || topic.type)
                                      )}>
                                        {topic.file_format || topic.type}
                                      </span>
                                    )}
                                    {durationText && (
                                      <span className="text-xs text-ink-muted font-medium">
                                        {durationText}
                                      </span>
                                    )}
                                    {variant === 'student' && (topic.completion_rate !== undefined || topic.completion_percentage !== undefined) && (
                                      <span className="text-xs text-ink-muted font-medium">
                                        {topic.completion_percentage ?? topic.completion_rate}% done
                                      </span>
                                    )}
                                  </div>
                                </div>
                                 {variant !== 'student' ? (
                                  <Tag
                                    variant="status"
                                    status={topic.is_published ? "published" : "draft"}
                                    className="flex-shrink-0 mt-0.5"
                                  >
                                    {topic.is_published ? "Published" : "Draft"}
                                  </Tag>
                                ) : (
                                  <div className="flex-shrink-0 mt-0.5">
                                    {(() => {
                                      const rate = topic.completion_percentage ?? topic.completion_rate ?? (topic.completed ? 100 : 0);
                                      if (rate === 100) return <Tag variant="status" status="completed">Completed</Tag>;
                                      if (rate > 0) return <Tag variant="status" status="pending">Reading</Tag>;
                                      return <Tag variant="status" status="draft">New</Tag>;
                                    })()}
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center justify-end gap-3 mt-3">
                                {variant === 'student' ? (
                                  <>
                                    {topic.is_locked ? (
                                      <div className="flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-ink-muted" />
                                        <span className="text-sm text-ink-muted font-medium">Locked</span>
                                      </div>
                                    ) : (
                                      <>
                                        {handleStartTopic && (
                                          <Button
                                            variant="secondary"
                                            color="default"
                                            icon={topic.type === 'video' ? <Play /> : (topic.type === 'scorm' ? <Package /> : <BookOpen />)}
                                            size="sm"
                                            onClick={() => isScormLesson ? handleStartScorm(lesson.id, topic.id) : handleStartTopic?.(topic.id)}
                                          >
                                            {(() => {
                                              const rate = topic.completion_percentage ?? topic.completion_rate ?? (topic.completed ? 100 : 0);
                                              if (topic.type === 'video') {
                                                if (rate === 100) return 'Rewatch';
                                                if (rate > 0) return 'Resume';
                                                return 'Watch';
                                              } else {
                                                if (rate === 100) return 'Restart';
                                                if (rate > 0) return 'Continue';
                                                return 'Start';
                                              }
                                            })()}
                                          </Button>
                                        )}
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {handlePreviewTopic && (
                                      <Button
                                        variant="secondary"
                                        color="default"
                                        icon={<Eye />}
                                        size="sm"
                                        onClick={() => handlePreviewTopic?.(topic.id)}
                                      >
                                        Preview
                                      </Button>
                                    )}
                                    {onEditTopic && (
                                      <Button
                                        variant="secondary"
                                        color="outline"
                                        icon={<Edit />}
                                        size="sm"
                                        onClick={() => onEditTopic?.(topic.id)}
                                      >
                                        Edit
                                      </Button>
                                    )}
                                    {!topic.is_published && handlePublishTopic && (
                                      <Button
                                        variant="primary"
                                        color="default"
                                        size="sm"
                                        className="bg-gradient-to-r from-success to-success hover:opacity-90"
                                        onClick={() => handlePublishTopic?.(topic.id)}
                                      >
                                        Publish
                                      </Button>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center bg-surface/50 dark:bg-transparent border-t border-border/20 dark:border-border/10">
                      <BookOpen className="w-14 h-14 mx-auto mb-4 text-ink-muted opacity-20" />
                      <p className="text-base font-bold text-ink mb-1">
                        {variant === "student" ? "No published topics in this lesson" : "No topics in this lesson yet"}
                      </p>
                      {variant !== "student" && (
                        <p className="text-sm text-ink-muted">
                          Click &quot;New Topic&quot; to add your first topic
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
