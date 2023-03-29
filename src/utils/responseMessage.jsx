import {Alert} from 'react-bootstrap'

const ResponseMessage = ({success, successText, failureText}) => {

    if (success === null) {
        return <></>
    }

    if (success) {
        return (
            <Alert variant={'success'}>
                {successText}
            </Alert>
        )
    } else {
        return (
            <Alert variant={'warning'}>
                {failureText}
            </Alert>
        )
    }
}

export default ResponseMessage
