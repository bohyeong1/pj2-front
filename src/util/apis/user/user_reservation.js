import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";

// =================================================
// get user reservation pending list //
export async function get_reservation_pending_list(){
    const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/reservation/get-pending-list`, 'GET')
    return response
}