import React from 'react'

const Conditional = ({ condition, children }) => condition ? children : null

export default Conditional