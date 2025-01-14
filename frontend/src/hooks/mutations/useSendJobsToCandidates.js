// Temp comment
import { useMutation } from '@tanstack/react-query';
import { sendJobsToCandidates } from '../../services/API';

export const useSendJobsToCandidates = () => {
  const { mutateAsync, ...mutationData } = useMutation(sendJobsToCandidates, {});

  return { sendJobsToCandidates: mutateAsync, ...mutationData };
