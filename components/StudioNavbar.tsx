import React from 'react'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'


const StudioNavbar = (props: any) => {
    return (
        <div>
            <div className="studio-navbar">
                <Link href="/" className="studio-navbar-link">
                    <ArrowUturnLeftIcon className="studio-navbar-arrow" />
                    Go to the site
                </Link>
            </div>
            <>{props.renderDefault(props)}</>
        </div>
    )
}

export default StudioNavbar