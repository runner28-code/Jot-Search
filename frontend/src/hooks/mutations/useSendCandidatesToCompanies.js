import { useMutation } from '@tanstack/react-query';
import { sendCandidatesToCompanies } from '../../services/API';

export const useSendCandidatesToCompanies = () => {

  return { sendCandidatesToCompanies: mutateAsync, ...mutationData };
