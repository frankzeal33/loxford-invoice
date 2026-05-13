import { Suspense } from 'react'
import CustomerContent from './_components/CustomerContent'
import TableSkeleton from '@/components/TableSkeleton'

export default function Page() {
  const tableList = new Array(8).fill(null)

  return (
    <Suspense fallback={
      <div className='my-container'>
        <div className='bg-light p-3 rounded-xl border w-full mt-6'>
          <div className='w-full h-[58vh] bg-light rounded-sm flex'>
            <div className='grid w-full gap-2'>
              {tableList.map((_, index) => (
                <TableSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <CustomerContent />
    </Suspense>
  )
}