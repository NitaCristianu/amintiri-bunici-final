"use client"

import { Link } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function CommentSection({ comments, submitComment }: { comments: any[], submitComment: any }) {
    const [content, setContent] = useState<string>("");


    return <div>
        <form className="flex justify-center gap-5" action={() => submitComment(content)}>
            <textarea
                className="w-full bg-gray-200 resize-none items-center p-2 rounded-lg"
                placeholder="Scrie-ne cum ti s-a parut?"
                onChange={(event) => {
                    setContent(event.currentTarget.value);
                }}
            />
            <button type="submit" className="flex bg-black gap-5 p-3 rounded-lg">
                <p className="text-white-100  items-center flex justify-center">TRIMITE</p>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '6px' }} width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M3 20v-6l8-2l-8-2V4l19 8z" /></svg>
            </button>
        </form>
        <br />
        <div className="flex-col gap-5">

            {comments.map(({ username, content }, i) => <div key={i} className="mb-5 flex justify-between w-full bg-gray-200 resize-none items-center p-2 rounded-lg">
                <p>
                    "{content}"
                </p>
                <p
                    className="rounded-full font-bold mr-5"
                >
                    de {username}
                </p>
                
            </div>)}

        </div>
    </div>
}