import { useMutation } from '@tanstack/react-query';
// Temp comment
import { sendJobsToCandidates } from '../../services/API';

export const useSendJobsToCandidates = () => {
  const { mutateAsync, ...mutationData } = useMutation(sendJobsToCandidates, {});

  return { sendJobsToCandidates: mutateAsync, ...mutationData };
