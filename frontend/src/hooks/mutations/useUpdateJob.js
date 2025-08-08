import { useMutation } from '@tanstack/react-query'

export const useUpdateJob = () => {
  const mutation = useMutation(updateJob)

  return { saveJob: mutation.mutateAsync, ...mutation}
