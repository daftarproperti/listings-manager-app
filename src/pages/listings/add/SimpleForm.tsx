import { useForm } from 'react-hook-form'
import TextareaField from 'components/input/TextareaField'
import BottomStickyButton from 'components/button/BottomStickyButton'

interface simpleFormType {
  information: string
}

const SimpleForm = () => {
  const { register, handleSubmit } = useForm<simpleFormType>()

  const onSubmit = async (data: simpleFormType) => {
    console.log(data)
  }
  return (
    <div>
      <form className="mx-auto max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="items-start justify-center whitespace-nowrap border-b border-solid border-b-[color:var(--slate-200,#E2E8F0)] bg-slate-50 py-3 pl-4 pr-16 text-sm font-semibold leading-5 text-slate-500">
          Salin dan tempel informasi listing Anda di bawah ini
        </div>
        <div className="bg-slate-50 px-4 pb-24">
          <TextareaField
            label="Informasi Listing"
            registerHook={register('information', { required: true })}
            placeholderValue="Tulis keterangan untuk listing ini"
            errorMessage="Informasi Listing harus diisi"
            additionalClassName="min-h-96"
          />
        </div>
        <BottomStickyButton type="submit">Simpan</BottomStickyButton>
      </form>
    </div>
  )
}

export default SimpleForm
