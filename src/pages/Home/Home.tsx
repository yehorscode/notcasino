import MovingGamblingBar from "@/components/moving-gambling"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-rumisgone">
          Ahoy player! Want to have fun?
        </h1>
        <span>Shells won't spend themselves!</span>
        <br />
        <br />
        <Button className="bg-green-500 w-60 h-14" onClick={() => { window.location.href = "/games" }}>Browse Our Games!</Button> <br />
        <br />
        <br />
        <MovingGamblingBar />
        <br />
        <span className="opacity-40">
          We do not use real money, all the content provided for the site is
          purely for fun and does not allow for adding real money to your
          account or withdrawal.
        </span>
        <br />
        <a href="/attributes" className="opacity-30"><span>Authors of icons and required to mention content</span></a>
      </div>
    </div>
  )
}

