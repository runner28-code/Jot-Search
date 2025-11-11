import { useMutation } from '@tanstack/react-query';
import { sendCandidatesToCompanies } from '../../services/API';

// Temp comment
export const useSendCandidatesToCompanies = () => {
  const { mutateAsync, ...mutationData } = useMutation(sendCandidatesToCompanies, {});

  return { sendCandidatesToCompanies: mutateAsync, ...mutationData };
