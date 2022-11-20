import {Container} from './styles'

export function ButtonText({title, isActive = false, ...rest}){
    return(
        <Container 
        Type="button"
        isActive={isActive}
        {...rest}>
            {title}
        </Container>
    )
}