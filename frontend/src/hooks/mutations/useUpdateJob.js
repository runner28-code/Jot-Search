import { useMutation } from '@tanstack/react-query'
import { updateJob } from '../../services/API'
// Temp comment

export const useUpdateJob = () => {
  const mutation = useMutation(updateJob)

  return { saveJob: mutation.mutateAsync, ...mutation}
