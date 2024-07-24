const Page = () => {
    return (
        <div>
            <h2 className={`font-gfs_didot font-bold text-2xl`}>Security</h2>
            <p className={`text-sm text-gray-600`}>Manage your security preferences</p>

            <div className={`mt-8`} id={`change-password`}>
                <h3 className={`font-bold font-gfs_didot`}>Update password</h3>
            </div>
        </div>
    )
}

export default Page;