import {SmallLoadingSpinner} from "@/components/ui/LoadingSpinner";

export const SubmitBtn = ({loading, text}) => {
    return (
        <button className={`dashboard-submit-btn`} type={`submit`} disabled={loading}>
            {loading ? (
                <span className={`flex gap-2 items-center justify-center`}>
                    Loading <SmallLoadingSpinner/>
                </span>
            ) : text}
        </button>
    )
}