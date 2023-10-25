import { lazy, Suspense } from "react"

function DynamicComponent ({componentName}) {
  const Component = lazy(() => import(`../tabs/${componentName}`))
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <Component />
    </Suspense>
  )
}

export default DynamicComponent