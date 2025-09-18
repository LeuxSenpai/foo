export default function userProfile({params}:any) { 
    return(
        <div>
            Profile
            <p className="text-4xl">Profile Page
                <span className="p-2 rounded bg-orange-500 text-black">{params.id}</span>
                </p>
        </div>
    )
}