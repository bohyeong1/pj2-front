

function useMenuSideStyle(data, states, refs, props){



    //props
    const {handle_ref} = props

    // handle url


    // modal 제어
    function handle_modal(){

        handle_ref.current.appear_modal()
    }

    return {handle_modal}
}
export default useMenuSideStyle