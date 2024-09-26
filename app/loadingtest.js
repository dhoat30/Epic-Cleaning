import Image from "next/image";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="loading-wrapper"><Image src="/logo.png" width={128} height={135} alt="Webduel Logo on Splash Screen" />
        <div className="spinner"></div>
    </div>
}
