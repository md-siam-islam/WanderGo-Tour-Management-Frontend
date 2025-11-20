import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dot } from "lucide-react"
import { useSendotpMutation, useVerifyotpMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"

export default function Verify() {
    const navigate = useNavigate()
    const location = useLocation()
    const [email] = useState(location.state)
    const [confirm , setConfrim] = useState(false)
    const [time , setTime] = useState(10)

   useEffect(() => {
        if (!email) {
            navigate("/")
        }
    }, [email])

    useEffect(() => {

        if(!email || !confirm){
            return
        }

        const timeId = setInterval(() => {
            if(email && confirm){
                setTime((prev) => (prev > 0 ? prev-1 : 0) )
            }
        } , 1000)

        return () => clearInterval(timeId)
    }, [email , confirm])




    const [sendOtp] = useSendotpMutation()
    const [verifyOtp] = useVerifyotpMutation()


    const sendOtpConfrim = async () => {
        const tostId = toast.loading("OTP Sending")
        try {
                const result = await sendOtp({email : email}).unwrap()
                if(result.success){ 
                setConfrim(true)
                setTime(10)
                toast.success("Your Otp  Successfull" , { id : tostId})
            }
            
        } catch (error) {
            console.log("Error From Sent Otp" , error)
        }
        
    }


    const FormSchema = z.object({
        pin: z.string().min(6, {
            message: "Your OTP must be 6 characters long.",
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    const onSubmit =  async (data: z.infer<typeof FormSchema>) => {
        const userInfo = {
            email : email,
            otp : data.pin
        }
        const tostId = toast.loading("Otp Verifing....")
         try {
            const result =  await verifyOtp(userInfo).unwrap()
            if(result.success){ 
                toast.success("Your Otp Verify Successfull" , { id : tostId})
                navigate("/")
            }
         } catch (error) {
            console.log(error)
         }
    }

    return (
        <div className="min-h-screen flex items-center justify-center from-background via-background to-muted p-4">

       {
        confirm ? (
            <Card className="w-full max-w-lg shadow-sm border border-border rounded-2xl p-6 bg-card">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-foreground">
            Verify Your Account
          </CardTitle>
          <CardDescription className="text-foreground text-base">
            We’ve sent a 6-digit verification code to{" "}
            <span className="text-primary font-semibold">{email}</span>. 
            Please check your inbox and enter the code below to verify your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col items-center"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <Dot></Dot>
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage className="text-destructive text-sm mt-2" />
                  </FormItem>
                )}
              />
              <Button
                className="w-3/4 py-3 text-base font-semibold rounded-xl"
                type="submit"
              >
                Verify Now
              </Button>

              <p className="text-sm text-foreground">
                Didn’t get the code?{" "}
                <Button
                onClick={sendOtpConfrim}
                disabled = {time !== 0}
                  type="button"
                  variant={"link"}
                  className="text-primary  hover:underline font-medium pr-2"
                >
                  Resend
                </Button>
                {time}
              </p>

            </form>
          </Form>
        </CardContent>
      </Card>
        ) : <Card className="w-full max-w-lg shadow-sm border border-border rounded-2xl p-6 bg-card">
                <CardHeader className="text-center space-y-2 flex flex-col items-center justify-center">
                    <CardTitle className="text-3xl font-bold text-foreground">
                        Verify Your Account
                    </CardTitle>
                    <CardDescription className="text-foreground text-base">
                        We are about to send a 6-digit verification code to{" "}
                        <span className="text-primary font-semibold">{email}</span>.
                        Please confirm and get ready to enter the code once it arrives in your inbox.
                    </CardDescription>
                    <Button
                        onClick={sendOtpConfrim}
                        className="w-3/4 py-3 text-base font-semibold rounded-xl items-center"
                        type="submit"
                    >
                        Verify Now
                    </Button>
                </CardHeader>
            </Card>
     
       }

</div>
            
    )
}
