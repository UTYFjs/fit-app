export const  getCssVar = (propertyValue: string) => {
  const rootStyles = getComputedStyle(document.documentElement);
  const value = rootStyles.getPropertyValue(propertyValue);
  
  return value
}