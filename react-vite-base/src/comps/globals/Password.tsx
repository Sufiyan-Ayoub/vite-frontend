import { FC, useState } from "react"
import { Input } from "@/ui/input"
import { Eye, EyeClosed } from "lucide-react"

const Password:FC = () => {
    const [show, setShow] = useState(false)

    return (
        <div className="relative w-full">
            <Input
                id="password"
                name="psw"
                type={show ? "text" : "password"}
                placeholder="Enter your password"
            />
            <div className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShow(!show)}>
                {show ? <Eye className="size-4.5" /> : <EyeClosed className="size-4.5" />}
            </div>
        </div>
    )
}
export default Password;