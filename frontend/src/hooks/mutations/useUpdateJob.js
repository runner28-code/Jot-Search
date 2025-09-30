import { useMutation } from '@tanstack/react-query'
import { updateJob } from '../../services/API'

export const useUpdateJob = () => {

  return { saveJob: mutation.mutateAsync, ...mutation}
