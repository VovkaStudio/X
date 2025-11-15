type Params = { username: string }

export default async function TestPage({
    params
}: {
    params: Promise<Params>
}) {
    const { username } = await params

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
            Profile @{username}
            </h1>
        </div>
    )
}