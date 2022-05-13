import { FastifyPluginAsync, FastifyRequest } from "fastify"

const hostels: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/byName/:name', async function (request: ParamRequest, reply) {
		let res = await fastify.prisma.hostel.findMany({
			where: {
				name: {startsWith: request.params.name}
			},
			orderBy: {name: 'asc'}
		})

		return res
  })

	fastify.get('/byId/:id', async function (request: ParamRequest, reply){
		let res = await fastify.prisma.hostel.findUnique({
			where: {
				id: parseInt(request.params.id),
			},
		})

		return res
	})
}

type ParamRequest = FastifyRequest<{
	Params: {name: string, id: string}
}>

export default hostels