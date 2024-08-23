import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearproductcart } from "../../Apis/cartApi";

export function useMutationcart(fun) {
    const queryClient = useQueryClient()
    // queryClient.invalidateQueries({ queryKey: ['getcart'] }) علشان لما اعمل مسح لعنصر مش اعمل تحديث للصفحه لا ده يعمل مع نفسه
   return useMutation({mutationFn:fun,
    onSuccess:()=>{
        queryClient.invalidateQueries({ queryKey: ['getcart']}),
        queryClient.invalidateQueries({ queryKey: ['getwishcart'] });
    // مش شغاله قوي الحاجه دي 
    // لو الكارت بعد مسح كل حاجه فيها لما ترجع تاني ليها وكانت الميثود هي بتاعت الجيت ابقي خليها نال علشان الخطاء 404 مش يحصل 
    if(fun == clearproductcart) {
        queryClient.setQueriesData('getcart',null) 
    }
    }
    })
}