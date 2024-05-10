import { deleteNote } from "@/api/NoteApi"
import { useAuth } from "@/hook/useAuth"
import { Note } from "@/types/index"
import { formateData } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {
    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParam = new URLSearchParams(location.search)
    const taskId = queryParam.get('viewTask')!

    const { data, isLoading } = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

    if (isLoading) return 'Cargando...'

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
        }
    })

    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} por <span className="font-bold">{note.createdBy.email}</span>
                </p>
                <p className="text-xs text-slate-500">
                    {formateData(note.createdAt)}
                </p>
            </div>

            {canDelete && (
                <button
                    type="button"
                    className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
                    onClick={() => mutate({ projectId, taskId, noteId: note._id })}
                >Eliminar</button>
            )
            }
        </div >
    )
}
