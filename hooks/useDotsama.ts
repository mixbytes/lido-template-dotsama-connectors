import { useContext } from 'react';
import { DotsamaContext, DotsamaContextInterface } from '../providers';

export const useDotsama = (): DotsamaContextInterface =>
  useContext(DotsamaContext);
