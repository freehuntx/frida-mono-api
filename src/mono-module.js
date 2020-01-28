const KNOWN_RUNTIMES = ['mono.dll', 'libmonosgen-2.0.so' ];
const KNOWN_EXPORTS = ['mono_thread_attach'];

let monoModule = null;

// Look for a known runtime module.
for (let x of KNOWN_RUNTIMES) {
    let module = Process.findModuleByName(x);
    if (module) {
	monoModule = module;
	break;
    }
}

// Look for a known mono export.
if (!monoModule) {
    const monoThreadAttach = Module.findExportByName(null, 'mono_thread_attach')
    if (monoThreadAttach) monoModule = Process.findModuleByAddress(monoThreadAttach)
}
if (!monoModule) throw new Error('Can\'t find Mono runtime!')

export default monoModule
