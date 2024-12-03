export default function Card({ children, id }) {
    return (
        <div className="rounded p-4 bg-white" id={id}>
            {children}
        </div>
    )
}