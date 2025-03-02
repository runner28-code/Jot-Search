import { useMutation } from '@tanstack/react-query';

export const useSendJobsToCandidates = () => {
  const { mutateAsync, ...mutationData } = useMutation(sendJobsToCandidates, {});

  return { sendJobsToCandidates: mutateAsync, ...mutationData };
