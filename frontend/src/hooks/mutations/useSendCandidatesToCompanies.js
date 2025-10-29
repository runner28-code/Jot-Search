import { useMutation } from '@tanstack/react-query';

export const useSendCandidatesToCompanies = () => {
  const { mutateAsync, ...mutationData } = useMutation(sendCandidatesToCompanies, {});

  return { sendCandidatesToCompanies: mutateAsync, ...mutationData };
