const tourStyles = {
  popover: (base: any) => ({
    ...base,
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  }),
  arrow: (base: any) => ({
    ...base,
    borderRadius: '10px',
  }),
  maskWrapper: (base: any) => ({
    ...base,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
  }),
}

export default tourStyles
