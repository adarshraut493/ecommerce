import React from 'react'

const DescriptionBox = () => {
    return (
        <div className='bg-light py-12 md:py-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex gap-4 mb-8 border-b border-gray-200'>
                    <div className="px-6 py-3 font-semibold text-gray-900 border-b-2 border-orange">Description</div>
                    <div className='px-6 py-3 font-semibold text-gray-400'>Reviews (122)</div>
                </div>
                <div className='bg-white p-6 md:p-8 rounded border border-gray-200 space-y-4'>
                    <p className='text-gray-700 leading-relaxed'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi ea accusantium asperiores ut sapiente in officiis vero autem maiores, id est itaque deleniti corporis quasi culpa esse voluptas cum fuga hic repudiandae! Tempora quia illo cupiditate error, voluptates eius perferendis ullam eaque nostrum consectetur rem ratione corporis debitis nihil facilis.</p>
                    <p className='text-gray-700 leading-relaxed'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia repellendus dolores quisquam molestiae itaque, deleniti obcaecati. Sed eligendi porro a, neque accusantium ea, error nulla assumenda fugiat beatae minus in tempore, ex soluta ducimus deserunt! Ut quasi officia recusandae exercitationem veniam asperiores modi consequatur quisquam.</p>
                </div>
            </div>
        </div>
    )
}

export default DescriptionBox