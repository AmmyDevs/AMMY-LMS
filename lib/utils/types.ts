export type NavItem = {
  id: string;
  type?: 'lecture' | 'self-study' | 'further';
  label: string;
  subtitle?: string;
  children?: NavItem[];
  slug?: string;
}

export type ParameterConfig =
  | {
      id: string;
      label: string;
      type: 'slider';
      min: number;
      max: number;
      step: number;
      default: number;
      unit?: string;
    }
  | {
      id: string;
      label: string;
      type: 'select';
      default: string;
      options: Array<{ value: string; label: string }>;
    }
  | {
      id: string;
      label: string;
      type: 'toggle';
      default: boolean;
    };

export type EffectConfig = {
  id: string;
  title: string;
  description: string;
  pythonModule: string;
  pythonFunction: string;
  parameters: ParameterConfig[];
  hint?: string;
};

export type ProgressValue = Record<string, unknown>;

export type LMSState = {
  username: string | null;
  setUsername: (name: string) => void;
  clearUsername: () => void;
  currentPath: string[];
  setCurrentPath: (path: string[]) => void;
  progress: Record<string, ProgressValue>;
  setProgress: (key: string, data: Partial<ProgressValue>) => void;
  resetProgress: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
};

export type InteractiveBlockInternalState = {
  blockState: 'idle' | 'ready' | 'processing' | 'done' | 'error';
  uploadedFile: File | null;
  originalUrl: string | null;
  processedUrl: string | null;
  currentParams: Record<string, unknown>;
  errorMessage: string | null;
  processingTimeMs: number | null;
};