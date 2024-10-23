import { useClickAway } from 'use-click-away';
import { useEffect } from "react";

function useDetailSection1PaymentStyle(data, states, refs, props){

    // =================================================
    // states //
    const {
        checkin_date,
        setCheckin_date,
        checkout_date,
        setCheckout_date,
        pay_day,
        setPay_day,
        capacity,
        setCapacity,
        animal,
        setAnimal,
        calendar_modal,
        setCalendar_modal,
        capacity_modal,
        setCapacity_modal,
        animal_modal,
        setAnimal_modal} = states

    // =================================================
    // refs //
    const {
        detail_capacity,
        detail_animal,
        calendar_modal_ref,
        capacity_modal_ref,
        animal_modal_ref} = refs

    // =================================================
    // 모달 전역 이벤트 제어 //
    useClickAway(calendar_modal_ref, (e)=>{
        if(calendar_modal && e.target.closest('.section1-payment__section1-check')){
            return
        }
        if(capacity_modal && e.target.closet('.section1-payment__section1-capacity')){
            return
        }
        if(animal_modal && e.target.closet('.section1-payment__section1-animal')){
            return
        }        
        if(calendar_modal){
            setCalendar_modal(false)
        }
        if(capacity_modal){
            setCapacity_modal(false)
        }
        if(animal_modal){
            setAnimal_modal(false)
        }
    })

    // =================================================
    // 숙박일 계산 //
    useEffect(()=>{
        if(checkin_date && checkout_date){
            const pay_day = checkout_date.getTime() - checkin_date.getTime()
            setPay_day(new Date(pay_day).getDate())
        }
    },[checkout_date])

    // =================================================
    // 플러스 버튼 //
    function click_plus(call_back, value){
        call_back(value + 1)
    }

    // =================================================
    // 마이너스 버튼 //
    function click_minus(call_back, value){
        call_back(value - 1)
    }

    // =================================================
    // 달력 모달 열기 //
    function open_calendar(e){
        e.preventDefault()
        e.stopPropagation()
        if(!calendar_modal){
            setCalendar_modal(true)
        }
    }

    // =================================================
    // 체크인 체크아웃 날짜 초기화 //
    function delete_calendar(){
        setCheckin_date(null)
        setCheckout_date(null)
    }

    // =================================================
    // 달력 모달 닫기 //
    function confirm_calendar(){
        setCalendar_modal(false)
    }

    // =================================================
    // 달력 모달 자동 닫기 //
    useEffect(()=>{
        if(checkin_date && checkout_date){
            setCalendar_modal(false)
        }
    },[checkin_date, checkout_date])
    
    // =================================================
    // 인원 모달 열기 //
    function open_capacity(){
        setCapacity_modal(true)
    }

    // =================================================
    // 인원 모달 닫기 //
    function close_capacity(){
        setCapacity_modal(false)
    }
    
    // =================================================
    // 동물 모달 열기 //
    function open_animal(){
        setAnimal_modal(true)
    }

    // =================================================
    // 동물 모달 닫기 //
    function close_animal(){
        setAnimal_modal(false)
    }
    return {
        open_capacity,
        close_capacity,
        close_animal,
        open_animal,
        click_plus,
        click_minus,
        open_calendar,
        delete_calendar,
        confirm_calendar
    }
}
export default useDetailSection1PaymentStyle