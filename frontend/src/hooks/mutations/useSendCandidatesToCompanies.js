import { useMutation } from '@tanstack/react-query';
import { sendCandidatesToCompanies } from '../../services/API';

  const { mutateAsync, ...mutationData } = useMutation(sendCandidatesToCompanies, {});

  return { sendCandidatesToCompanies: mutateAsync, ...mutationData };
