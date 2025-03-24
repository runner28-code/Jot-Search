import { useMutation } from '@tanstack/react-query';
import { sendJobsToCandidates } from '../../services/API';

  const { mutateAsync, ...mutationData } = useMutation(sendJobsToCandidates, {});

  return { sendJobsToCandidates: mutateAsync, ...mutationData };
