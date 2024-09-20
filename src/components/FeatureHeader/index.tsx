interface HeaderProps {
    title: string
}

export default function FeatureHeader ({title}: HeaderProps) {
    return (
        <div className="p-5">
            <p className="text-xl text-primary border-b-2 border-primary w-full mt-5 font-bold">{title}</p>
        </div>
    )
}