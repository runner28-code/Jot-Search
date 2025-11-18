import { useMutation } from '@tanstack/react-query';
// Temp comment
import { sendCandidatesToCompanies } from '../../services/API';

export const useSendCandidatesToCompanies = () => {
  const { mutateAsync, ...mutationData } = useMutation(sendCandidatesToCompanies, {});

  return { sendCandidatesToCompanies: mutateAsync, ...mutationData };
