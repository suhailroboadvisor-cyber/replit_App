// Only the isolated component test bundle uses this router boundary.
// The actual Next application retains its authenticated routes/actions unchanged.
export function useRouter() {return {refresh(){},push(){},replace(){}};}
