class DeleteDialogFragment : DialogFragment() {
    private var onConfirmDelete: (() -> Unit)? = null
    
    fun setOnConfirmDeleteListener(listener: () -> Unit) {
        onConfirmDelete = listener
    }

    interface DeleteDialogListener {
        fun onDeleteConfirmed(id: String)
    }

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        return activity?.let {
            AlertDialog.Builder(it)
                .setTitle("Delete Confirmation")
                .setMessage("Are you sure you want to delete this item?")
                .setPositiveButton("Delete") { dialog, _ ->
                    arguments?.getString("itemId")?.let { id ->
                        (parentFragment as? DeleteDialogListener)?.onDeleteConfirmed(id)
                    }
                    dialog.dismiss()
                }
                .setNegativeButton("Cancel") { dialog, _ ->
                    dialog.cancel()
                }
                .create()
        } ?: throw IllegalStateException("Activity cannot be null")
    }

    companion object {
        fun newInstance(onDelete: () -> Unit): DeleteDialogFragment {
            return DeleteDialogFragment().apply {
                setOnConfirmDeleteListener(onDelete)
            }
        }
    }
} 