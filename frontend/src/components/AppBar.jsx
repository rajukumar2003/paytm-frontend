
export function AppBar() {
    return (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
            <div className="text-white text-lg font-bold">PayTM App</div>
            <div className="flex items-center">
                <div className="text-white mr-4">Hello</div>
                <div className="rounded-full h-12 w-12 bg-gray-600 flex items-center justify-center">
                    <div className="text-white text-sl font-bold">{ localStorage.getItem('username') }</div>
                </div>
            </div>
        </div>
    );
}

