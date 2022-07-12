import { CSSProperties } from '@mui/styles';

export type Variant = 'standard' | 'filled' | 'outlined' | undefined;

export interface MuiStyles {
  [key: string]: CSSProperties;
}
