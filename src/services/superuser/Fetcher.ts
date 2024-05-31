export async function DefaultFetcher(url: string) {
    const res = await fetch(url)
    if(!res.ok) {
        throw new Error('An error occurred while fetching the data')
    }
    return res.json()
}