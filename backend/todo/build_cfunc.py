import cffi

ffi = cffi.FFI()
ffi.cdef("""
         float calc_gpa(float grades, int units);
         """)

ffi.set_source("_cfunc",
"""
    float calc_gpa(float grades, int units);
""",
    sources = ['todo/cfunc.c'],
    library_dirs = [],
)
ffi.compile(verbose=True)