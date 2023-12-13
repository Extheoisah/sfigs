import Image from "next/image"
import { auth } from "./auth"

export default async function Home() {
    const session = await auth()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <section className="z-10 max-w-5xl w-2/4 items-center justify-between font-mono text-sm">
                <div className="flex w-full items-center justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  rounded-xl lg:border lg:bg-gray-200 p-4 lg:dark:bg-zinc-800/30">
                    <p className="w-full">Welcome {session?.user.name}!</p>
                    <picture className="flex w-full h-full items-end justify-end">
                        <Image
                            src={session?.user.image || "/vercel.svg"}
                            alt="Vercel Logo"
                            className="rounded-full"
                            width={48}
                            height={48}
                            priority
                        />
                    </picture>
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-center mt-10">
                        Surfacing Good First Issues
                    </h1>
                    <p className="text-center mt-4">for Open Source Projects</p>
                </div>
                <footer className="flex w-full items-center justify-center mt-10 border-t border-gray-300 bg-gradient-to-t from-zinc-200 py-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  rounded-xl lg:border lg:bg-gray-200 p-4 lg:dark:bg-zinc-800/30">
                    <a
                        href="https://builders.btrust.tech/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between"
                    >
                        <p className="text-sm w-full h-full">Made with ❤️ by</p>
                        <picture className="flex h-full w-[80px] items-end justify-end">
                            <Image
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAk1BMVEX///8tLS0AAAAlJSUpKSkaGhqpqakdHR0gICDl5eVxcXEXFxdfX1/Nzc1GRkajo6MSEhLw8PCysrL5+fnV1dUKCgpMTEy8vLyOjo4yMjKWlpacnJxVVVVaWlp3d3dkZGQ7OzuCgoLt7Ob6/vfY5+2YnayVnr5JkbKdvsHM0tp4jbCQ0+GVk5qdr8lwwcyPj4lheare4cgHAAADW0lEQVRoge2W2XbjKBCGoUC7kMQia8GKcC8zk+lt3v/pppAUdzuxE00f55y54L+wCYo/oOqvQoQEBQUFBQUFBQUF/R+Ujdba+J3gBpKkOLwXvKGUH+9NtfWiPqWUVnWtRKbvB4dokWdTHkVFW9Dc3A1OX4hBfqfdX4FTGk13hbPCK+EbvbmPK1c4e1Axajy2K/xOxlnh0dNOu2Y7yV2i/gxOZrZMpAiXSim5hyGUErvgpwXOfbFmEMEuV85tm++CD0tOC4tDCRSyPfCcsYdX4MkGN9NSTWmFUeknRvk0dSQvp5ioQ6emctlgX5Y9fsWTc7nwv3GUuvmaezcr8tQrAbYU0dGHevbrcDRllUbjA7SdbdJq2WiS4CJTy6KEQU9Mu1bebfgvGvI1O6V/1EBNKk6HlCM84dUWhZx0QAd7ijgI43fEYB+czmrxoTZAWyG1h9PicBAX8DhKMTYWt0L0jBP6mq82eNp4FSlfQjEse88wod4tCGd+Yny2c9oLTbR+M6Hs1C0aq2TJAIgL+PrbCzjJIU0aKAV5E/7Tig/puYh+wtPxJZyI/tAmHNR/gEt27lwv4TTBNTUeNCeZMRmRfcKdflrtbbh2a5zwv2VEeVmbM7xrKSuFQIvi0xqASpK1dNDkhDO23gE3xQovcYwVxRcrrnBNMbMFmt3DJWWcHweazhgghCS3rRipbd/CrS3d+4xkFRQIdw3068JRk0Ztl7ftvDyMigict+AITfGKz93BqxqK7bqAtZCMig3BVr81PRmPcUa6OO78X6IerVhbc4Zzt+GUL3qqI3bzFWZXJ3sOv1BKf2UYIc6dtwPV9T4Suu9+B86j5vL2HwAg2Wak1T18IB8/ajjtgK9q1sJE8ck+O7o7EgXidCR6sMaZET58+jxYTLlyw0jU0B11zo/X4pWt6gp//eDgSv9xri4dKRnR0BsQI+g//vzr6MdjDLECOMRg5ur2AXxTvnXlV8N4qGTJz/DHv7/gNTWOcOohx0NhLbn+lUwvtXMD7ibsBCpv8NPDv8Ljt+/4WjzWkEkrFGChdqK85vMdGsABmBhSCr0A8QPkt38wyb1sGPfzEleaD78J9+9LeOjOZrGQNhO1lo8jjomsMffG+gZq7a6XkKCgoKCgoKCgoKD3079sGzMHbu6zLwAAAABJRU5ErkJggg=="
                                alt="Btrust builders Logo"
                                className="rounded-full"
                                width={48}
                                height={48}
                                priority
                            />
                        </picture>
                    </a>
                </footer>
            </section>
        </main>
    )
}
