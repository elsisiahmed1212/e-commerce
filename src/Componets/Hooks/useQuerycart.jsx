import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export function useQuerycart(key,fun) {
    return useQuery({queryKey:[key],queryFn:fun})
}
