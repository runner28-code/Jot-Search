import { useMutation } from '@tanstack/react-query'
import { updateJob } from '../../services/API'

  const mutation = useMutation(updateJob)

  return { saveJob: mutation.mutateAsync, ...mutation}
