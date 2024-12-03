export default function Container({ children, withPadding = true, fullHeight = false }) {
    return (
        <div className={`w-full sm:max-w-4xl mx-auto px-2${withPadding ? ' sm:px-5 py-8' : ''}${fullHeight ? ' min-h-screen' : ''}`} >
            {children}
        </div >
    );
}