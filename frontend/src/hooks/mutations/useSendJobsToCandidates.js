import { useMutation } from '@tanstack/react-query';
import { sendJobsToCandidates } from '../../services/API';

export const useSendJobsToCandidates = () => {

  return { sendJobsToCandidates: mutateAsync, ...mutationData };
